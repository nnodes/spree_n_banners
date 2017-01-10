class AddVideosToSpreeBanner < ActiveRecord::Migration
  def change
    add_column :spree_banners, :video_url, :string
    add_column :spree_banners, :video_id, :string
  end
end
