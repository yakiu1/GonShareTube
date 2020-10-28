# Gon Share Tube 開發人員手冊

## 環境建置

* 安裝nodejs 14.15.0
* 安裝Angular CLI 10

安裝上述套件後，於專案執行npm install 開始安裝必要套件。

## 基本指令
以下常用指令使用npm run 直接執行

* start - serve專案進行debug
* build - 建置專案
* electron:build - 建置為執行檔(.exe)應用程式
* test - 進行測試
* version - 生成版本更變檔(CHANGELOG.md)

## 檔案架構

* core - 主要為service存放位置，包含外部連線&存取應用程式狀態
* difs - 定義各式資料格式(type、enum、interface)...
* pages - 主要功能頁面的開發
* shared - 共用元件、函式、指令
* state - store狀態的管理、action、reducers

## Store狀態存取
