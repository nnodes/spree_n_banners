module Spree
  class Banner < Spree::Base
    validates :order, presence: true
    has_attached_file :image
    #validates_attachment_file_name :image, matches: [/png\z/, /jpe?g\z/]
    do_not_validate_attachment_file_type :image
    validates_presence_of :video_url, unless: :image?
    validates_presence_of :image, unless: :video_url?

    before_save :save_video_id, if: :video_url?

    def save_video_id
      video_vimeo_json = JSON.load(open('https://vimeo.com/api/oembed.json?url=' + video_url))
      self.video_id = video_vimeo_json['video_id']
    rescue OpenURI::HTTPError
      throw(:abort)
    end
  end
end