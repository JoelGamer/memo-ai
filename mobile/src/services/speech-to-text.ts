import API from './api';

class SpeechToText extends API {
  private endpoint = 'speech_to_text';

  async create(params: STTParams) {
    return (
      await this.serverInstance.post<{ transcript: string | undefined }>(
        this.endpoint,
        params,
      )
    ).data;
  }
}

export default new SpeechToText();

interface STTParams {
  file: string;
  fileName: string;
  fileFormat: string;
}
