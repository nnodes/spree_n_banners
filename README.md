SpreeBanners
============

Spree Extension to add a banner to the homepage and its corresponding admin menu. Uses the rich text editor CKeditor 4.1.3 and simple_form.

## Installation

1. Add this extension to your Gemfile with this line:
  ```ruby
  gem 'spree_banners', github: 'nnodes/spree_n_banners'
  ```

2. Install the gem using Bundler:
  ```ruby
  bundle install
  ```

3. Copy & run migrations
  ```ruby
  bundle exec rails g spree_banners:install
  ```

4. Restart your server

  If your server was running, restart it so that it can find the assets properly.




Copyright (c) 2017 NNodes, released under the New BSD License