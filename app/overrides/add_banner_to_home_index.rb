Deface::Override.new(:virtual_path => 'spree/home/index',
  :name => 'add_banner_to_home_index',
  :insert_after => "[data-hook='homepage_products']",
  :text => '
    <div id="carousel-example-generic-home" class="carousel slide" data-ride="carousel" style="overflow: hidden;margin-left:-15px;margin-right:-15px;">
      <div class="carousel-inner carousel-big" role="listbox">
        <% first = true %>
        <% indicators = 0 %>
        <% @banners.order(:order).each do |banner| %>
          <% if banner.active %>
            <% indicators += 1 %>
            <div class="item <%= "active" if first %>">
              <% first = false %>
              <%= image_tag banner.image %>
              <div class="carousel-caption"><%= banner.html.html_safe %></div>
            </div>
          <% end %>
        <% end %>
      </div>
      <% if indicators > 1 %>
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic-home" data-slide-to="0" class="active"></li>
        <% for i in 1..(indicators-1) %>
            <li data-target="#carousel-example-generic-home" data-slide-to="<%= i %>"></li>
        <% end %>
        </ol>
        <a class="left carousel-control" href="#carousel-example-generic-home" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic-home" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      <% end %>
    </div>
  ')