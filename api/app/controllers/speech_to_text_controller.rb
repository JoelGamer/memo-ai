class SpeechToTextController < ApplicationController
  def create
    render json: Google::GoogleSpeech.speech_to_text(params[:file], params[:fileName], params[:fileFormat])
  end
end
