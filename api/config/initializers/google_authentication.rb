require "google/cloud/storage"
require "google/cloud/speech"

project_id = ''
file_name = ''
authentication_json = Rails.root.join('env', file_name)

Rails.configuration.google_storage = Google::Cloud::Storage.new(project: project_id, keyfile: authentication_json)
Rails.configuration.google_speech = Google::Cloud::Speech.speech do |config|
  config.credentials = authentication_json.to_s
end
