module Spree
  class Banner < Spree::Base
    validates :image, :order, presence: true
    has_attached_file :image
    #validates_attachment_file_name :image, matches: [/png\z/, /jpe?g\z/]
    do_not_validate_attachment_file_type :image
  end
end