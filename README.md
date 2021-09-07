# Albumin Diet Mobile App

## Overview

Albumin Diet is an application that aims to make a music streaming platform (Spotify) less playlist-centric and more album oriented.
With Albumin Diet you can:

* Tag your saved albums with your custom-made tags
* Browse your saved albums by tag
* Save an album in your listening-list and listen to them later

## Try it

**N.B.** This is intended to be a POC and is using a free DBaaS with limited storage available. All your data may be lost without warning.

### Android

Albumin Diet for Android can be installed from the [Play Store](https://play.google.com/store/apps/details?id=com.gianlucaparadise.albumindietmobapp).

### iOS

Albumin Diet for iOS is fully working, but it has not been published yet because I can't afford the Apple Developer License 😢

However, you can use the web version: www.albumindiet.ml

## Ecosystem

Albumin Diet has born to test the capabilities of several technologies. The whole ecosystem is made of the following applications:

* [albumin-diet-engine](https://github.com/gianlucaparadise/albumin-diet-engine)
  * Backend
* [albumin-diet-portal](https://github.com/gianlucaparadise/albumin-diet-portal)
  * Frontend Web
* [albumin-diet-mobapp](https://github.com/gianlucaparadise/albumin-diet-mobapp) (this repository)
  * Frontend Mobile App

## Tech notes

I used this project to test the capabilities of the following technologies:

* React Native
* Typescript (to test React Native compatibility)
* Redux pattern

## Dev notes

To run this application locally, you need to perform the following steps:

1. Clone the repository

```sh
git clone https://github.com/gianlucaparadise/albumin-diet-mobapp && cd albumin-diet-mobapp
```

2. Install the dependencies

```sh
yarn install
```

### Prerequisites

You need to run the *albumin-diet-engine* locally following [this](https://github.com/gianlucaparadise/albumin-diet-engine/blob/master/README.md) guide.

### iOS setup

1. Install iOS dependencies 

```sh
cd ios && pod install && cd ..
```

2. Run the app:

```sh
yarn ios
```

### Android setup

1. Fill the example keystore file with your information

```sh
cp android/keystoreinfo.example.gradle android/keystoreinfo.gradle && vi android/keystoreinfo.gradle # use your favorite editor instead of vi
```

2. Open `android/` folder with Android Studio and make it auto-configure everything

```sh
studio android/
```

**N.B.** this works only if you have installed the [command line launcher](https://stackoverflow.com/a/48266060/6155481)

3. Run the app:

```sh
yarn android
```

### Cleaning

* Clean android using _gradle_:

```sh
yarn clean-android
```

* Clean ios using _xcodebuild_:

```sh
yarn clean-ios
```

* Clean node_modules and re-install:

```sh
yarn clean-node
```