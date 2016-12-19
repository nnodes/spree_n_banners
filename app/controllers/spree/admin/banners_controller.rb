module Spree
  module Admin
    class BannersController < ResourceController
      
      def index
        @banners = Spree::Banner.all
      end

      def new
        @banner = Spree::Banner.new
      end

      def update
        respond_to do |format|
          if @banner.update(banner_params)
            format.html { redirect_to admin_banners_path, notice: 'Se actualizó exitosamente el servicio.' }
          else
            format.html { render :edit }
          end
        end
      end

      private

        def banner_params
          params.require(:banner).permit(:image, :order, :html, :active)
        end

    end
  end
end