# TwitterCleaner

Chrome extension for cleaning reposts and deleting posts on X (Twitter).

This project does not use the official X API.  
Instead, it automates interactions with buttons directly on the browser page.

---

# 한국어

## 소개

TwitterCleaner는 X(Twitter)에서 내가 작성한 게시물 삭제 및 재게시(리트윗) 취소를 도와주는 개인용 Chrome 확장 프로그램입니다.

공식 X API 대신 브라우저 화면의 UI를 직접 조작하는 방식으로 동작합니다.

## 주요 기능

- 내가 작성한 게시물 삭제
- 내가 재게시한 게시물 재게시 취소
- 현재 화면에 표시된 게시물 기준 처리
- Chrome 확장 프로그램 기반
- API Key 및 서버 불필요

## 설치 방법

1. 이 저장소를 다운로드합니다.
2. Chrome에서 아래 주소로 이동합니다.

```txt
chrome://extensions
```

3. 우측 상단 `개발자 모드` 활성화
4. `압축해제된 확장 프로그램 로드`
5. 프로젝트 폴더 선택

## 사용 방법

1. X(Twitter)에 로그인
2. 본인 프로필 페이지 이동
3. 확장 프로그램 실행
4. `리트윗 청소 시작` 버튼 클릭

## 동작 방식

### 내가 작성한 게시물

```txt
점 세 개 → 삭제하기 → 삭제 확인
```

### 내가 재게시한 타인의 게시물

```txt
재게시 버튼 → 재게시 취소
```

## 주의사항

- X UI 변경 시 동작하지 않을 수 있습니다.
- 삭제 작업은 되돌리기 어려울 수 있습니다.
- 과도한 자동화 사용은 계정 제한의 원인이 될 수 있습니다.
- 사용자는 본인의 책임 하에 사용해야 합니다.
- 현재 화면에 표시된 게시물만 처리합니다.
- 자동 스크롤 기능은 포함되어 있지 않습니다.

## 프로젝트 배경

초기에는 X 공식 API를 활용한 정리 도구를 개발하려 했으나, API 크레딧 제한 및 비용 문제로 인해 브라우저 확장 프로그램 방식으로 방향을 변경했습니다.

## 기술 스택

- Chrome Extension Manifest V3
- JavaScript
- HTML/CSS
- Content Script

---

# English

## Overview

TwitterCleaner is a personal Chrome extension for deleting your own posts and undoing reposts on X (Twitter).

This project does not use the official X API.  
Instead, it directly interacts with the browser UI.

## Features

- Delete your own posts
- Undo reposts
- Works on currently visible posts
- No API key required
- No backend server required

## Installation

1. Download this repository
2. Open:

```txt
chrome://extensions
```

3. Enable `Developer Mode`
4. Click `Load unpacked`
5. Select the project folder

## Usage

1. Login to X
2. Open your profile page
3. Launch the extension
4. Click `Start Cleaning`

## How It Works

### Your own posts

```txt
More menu → Delete → Confirm
```

### Reposts

```txt
Repost button → Undo repost
```

## Warning

- May stop working if X changes its UI
- Deleted posts may not be recoverable
- Excessive automation may risk account restrictions
- Use at your own responsibility
- Only currently visible posts are processed
- Auto-scrolling is not included

## Background

This project originally started as an X API-based cleaner tool.  
Due to API credit limitations and pricing issues, the project was redesigned as a browser extension.

## Tech Stack

- Chrome Extension Manifest V3
- JavaScript
- HTML/CSS
- Content Script

---

# 日本語

## 概要

TwitterCleanerは、X（Twitter）上で自分の投稿削除および再投稿取り消しを支援する個人用Chrome拡張機能です。

公式X APIは使用せず、ブラウザ画面上のUIを直接操作して動作します。

## 主な機能

- 自分の投稿削除
- 再投稿取り消し
- 現在画面に表示されている投稿を対象に処理
- Chrome拡張機能ベース
- API Key不要
- サーバー不要

## インストール方法

1. このリポジトリをダウンロード
2. 以下を開く

```txt
chrome://extensions
```

3. 「デベロッパーモード」を有効化
4. 「パッケージ化されていない拡張機能を読み込む」
5. プロジェクトフォルダを選択

## 使用方法

1. Xにログイン
2. 自分のプロフィールページを開く
3. 拡張機能を実行
4. 「リツイート掃除開始」をクリック

## 動作方式

### 自分の投稿

```txt
三点メニュー → 削除 → 確認
```

### 再投稿

```txt
再投稿ボタン → 再投稿取り消し
```

## 注意事項

- XのUI変更により動作しなくなる可能性があります
- 削除した投稿は元に戻せない場合があります
- 過度な自動化はアカウント制限の原因となる可能性があります
- 自己責任でご使用ください
- 現在画面に表示されている投稿のみ処理します
- 自動スクロール機能は含まれていません

## 開発背景

当初はX公式APIを利用した整理ツールとして開発していましたが、APIクレジット制限およびコスト問題により、ブラウザ拡張機能方式へ変更しました。

## 技術スタック

- Chrome Extension Manifest V3
- JavaScript
- HTML/CSS
- Content Script

---

# License

This project is distributed under a custom non-commercial license.

Commercial use is prohibited.
