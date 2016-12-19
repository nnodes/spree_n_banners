Deface::Override.new(:virtual_path => 'spree/admin/shared/_main_menu',
  :name => 'add_banner_tab_to_admin_menu',
  :insert_after => "erb[silent]:contains('if can? :admin, Spree::Order')",
  :text => '
  <% if can? :admin, Spree::Banner %>
    <ul class="nav nav-sidebar">
      <%= tab *Spree::BackendConfiguration::BANNER_TABS, icon: "picture" %>
    </ul>
  <% end %>
  ')