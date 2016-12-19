class CreateSpreeBanners < ActiveRecord::Migration
  def change
    create_table :spree_banners do |t|
      t.attachment :image
      t.text :html
      t.integer :order
      t.boolean :active
    end
  end
end
