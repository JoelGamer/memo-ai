class Google::GoogleSpeech
  class << self
    def speech_to_text(file_binary, file_name, file_format)
      file = create_file(file_binary, file_name, file_format)

      begin
        ops = google_speech.long_running_recognize(config: config, audio: audio(file))
        ops.wait_until_done!
      rescue => ex
        raise ex
      end

      File.delete(file.path)
      ops.response.results
    end

    def create_file(file_binary, file_name, file_format)
      File.open("#{file_name}#{file_format}", 'wb') do |f|
        f.write(Base64.decode64(file_binary))
      end

      file = File.open("#{file_name}#{file_format}", 'r')
      flac_file = audiofile_to_audioflac(file)

      file.close
      File.delete(file.path)

      flac_file
    end

    private

    def audiofile_to_audioflac(file)
      path = file.path
      flac_path = "#{file.path.split('.').first}.flac"

      system("ffmpeg -i #{path} #{flac_path}")

      File.open(flac_path, 'r')
    end

    def config
      {
        encoding: :FLAC,
        sample_rate_hertz: 48000,
        language_code: 'pt-BR',
      }
    end

    def audio(file)
      { content: file }
    end

    def google_speech
      Rails.configuration.google_speech
    end
  end
end
