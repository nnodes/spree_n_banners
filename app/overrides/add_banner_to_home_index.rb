Deface::Override.new(:virtual_path => 'spree/home/index',
  :name => 'add_banner_to_home_index',
  :insert_top => "[data-hook='homepage_products']",
  :text => '
    <div id="carousel-banner" class="carousel slide" data-ride="carousel" data-hook="homepage_banner_carousel">
      <div class="carousel-inner" role="listbox">
        <% first = true %>
        <% indicators = 0 %>
        <% @banners.order(:order).each do |banner| %>
          <% if banner.active %>
            <% indicators += 1 %>
            <div class="item <%= "active" if first %>">
              <% first = false %>
                <% if banner.video_url.present? %>
                  <%= javascript_include_tag "spree/frontend/carousel_videos.js" %>
                  <div class="banner-video-class">
                    <% if banner.check_video_type %>
                      <%= embed(banner.video_id, indicators) %>
                    <% else %>
                      <div id="youtube-player-<%= banner.video_id %>" data-videoid="<%= banner.video_id %>" data-index="<%= indicators %>"></div>
                    <% end %>
                  </div>
                <% else %>
                  <%= image_tag banner.image, class: "img-responsive center-block" %>
                  <div class="carousel-caption"><%= banner.html.html_safe %></div>
                <% end %>
            </div>
          <% end %>
        <% end %>
      </div>
      <% if indicators > 1 %>
        <ol class="carousel-indicators">
          <li data-target="#carousel-banner" data-slide-to="0" class="active"></li>
        <% for i in 1..(indicators-1) %>
            <li data-target="#carousel-banner" data-slide-to="<%= i %>"></li>
        <% end %>
        </ol>
        <a class="left carousel-control" href="#carousel-banner" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-banner" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      <% end %>
    </div>
  ',
  :original => '461aae32b5912b8551fcf3a823427507f434a0cc')