Deface::Override.new(:virtual_path => 'spree/admin/shared/_main_menu',
  :name => 'add_banner_tab_to_admin_menu',
  :insert_before => "erb[silent]:contains('if can? :admin, Spree::Admin::ReportsController')",
  :text => '
  <% if can? :admin, Spree::Banner %>
    <ul class="nav nav-sidebar">
      <%= tab :banners, icon: "picture" %>
    </ul>
  <% end %>
  ',
  :original => 'b5fc1c7d68402c7ff3cdfd1b4352a9b0feed460d')