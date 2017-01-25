module Spree
  module BannersHelper
    def embed(video_id)
      content_tag(:iframe, nil, src: "https://player.vimeo.com/video/#{video_id}?api=1&player_id=player_#{video_id}&autoplay=0", id: "player_#{video_id}")
      #content_tag(:iframe, nil, src: "//www.youtube.com/embed/#{video_id}?autohide=1&autoplay=1&version=3&enablejsapi=1&controls=0&fs=0&rel=0&showinfo=0", class: 'youtube-iframe')
    end
  end
end