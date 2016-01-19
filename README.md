# OLLY

Now in development [join](https://github.com/AtomixInteractions/olly/pulls)

Olly — micro framework for building REST API. Olly configurable by nginx-like config.

```nginx
# for PEG.js

# Define new data model with name Error
model Error {
  prop Number code = 400; # default value. If set to `$status` variable will be resolved from state
  prop String error;
  prop String docs?; # not required property. If provided `false`, `undefined` or `null` was not rendered
}

model User {
  prop Number id?;
  prop String login;
  prop String email;
  prop String password?;
  prop Boolean admin? = false;

  # What validates when request is coming
  request {
    required [email, login];
    required password;
  }

  # What validates before response
  response {
    required id;
  }
}

model Admin {
  extends User;

  prop Boolean admin! = true;
  prop Number[] roles;
}


model Tag {
  prop String tag;
}

model Post {
  prop Number id;
  prop String title;
  prop String content;
  prop Number author?;
  prop Date created?;
  prop Date modificated?;
  prop Tag[] tags?; # array of custom models
}

model Comment {
  prop Number id;
  prop String content;
  prop Number author;
  prop Date created;
}

# default values for all configuration
host app.lestad.net/api;
scheme https;

# Define API v0
api 0 {
  version path; # You can specify path for version: `version path /first.version`
  # if version is `path` version will search at the end of $host
  # if version is `header`, version will search in header: `version header Accept "application/net.lestad.app.v0"`
  # If version is `none`, version not use. And that loaded if any version not loaded.
  # Default `version path /v$version`

  # host app.lestad.net/api; # you can set specified value for version
  scheme https http; # set protocols. Here is specified scheme for api v0

  mediaType application/json application/xml; # first is used by default if another not set

  # base get, post, put, patch, delete
  # routes must starts with "/"

  get /about; # default resolve to action "getAbout" of controller "index"
  post /register to @register; # resolve to action "createRegister" of controller "index"
  put /recover to user@recover; # resolve to action "recover" of controller "user".
  # if patch not specified, was created alias to put
  delete /session/:token; # resolve to action "removeSession" of default controller with `token` param

  # What model use on route
  post /login to user use User; # resolve to createLogin

  # define one resource
  # scope can be without model
  scope /back {
    # scope not create route

    post / to @new; # resolve to back@new
  }

  # Set controller for scope
  # Does scope need `use Model`?
  scope /whishlist to use/whishlist {
    get    /         to @list;
    post   /         to @add;
    delete /:id      to @remove; # resolve to use/whishlist@remove
  }
}



# Define API v1
api 1 {
  # will search header `X-API-Version: net.lestad.app.v1` for v1
  version header X-API-Version "net.lestad.app.v$version";

  # scheme was inherited

  mediaType application/json; # use only json. JSON default for Olly

  controller page; # set default controller to defined API

  get /about; # resolve to action "about" of controller "page"
}
```
