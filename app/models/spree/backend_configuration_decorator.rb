module Spree
  BackendConfiguration.class_eval do
    #preference :locale, :string, default: Rails.application.config.i18n.default_locale

    BANNER_TABS        ||= [:banners]
  end
end