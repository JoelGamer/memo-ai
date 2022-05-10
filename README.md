# Memo-AI

This is a mono-repository containing the API and the Mobile applications to run the Memo-AI stack

## General Idea

The project's purpose is to save Audio and/or Text in the mobile app. If the user saves an audio file, It'll be sent to the API, processed and then returned back to the mobile app in a text format to be saved with the audio file as a transcript.

## Stack

- Ruby on Rails
  - PostgreSQL
- React Native (with Typescript)

## Main Dependencies

- Ruby (3.0.2)
- React (17.0.2)
- React Native (0.68.0)

- google-cloud-speech
- react-native-audio-recorder-player
- react-native-tts
