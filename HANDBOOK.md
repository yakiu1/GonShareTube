# Gon Share Tube 開發人員手冊

## 環境建置

* 安裝nodejs 14.15.0
* 安裝Angular CLI 10

安裝上述套件後，於專案執行npm install 開始安裝必要套件。

## 基本指令
以下常用指令使用npm run 直接執行

* start - serve專案進行debug
* start:e - serve專案進行debug (不開啟網頁模式)
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

## 專案版本控管

* 專案使用 conventional-changelog 產生版本變更檔
* commit 寫法可以參考 => https://www.conventionalcommits.org/en/v1.0.0/

## 建立
### 建立Page
* 使用angular CLI 於src/pages底下建立component，不需要建立任何樣式(.css/.sass/.scss)
* page樣式統一寫在app/theme/page底下
* 樣式檔案命名 [Page Name].page.scss
* 需建立自己的路由並import至 appRoutingModule

### 建立Page底下Component
* 使用angular CLI 於src/pages/[page]/底下建立component，不需要建立任何樣式(.css/.sass/.scss)
* page樣式統一寫在app/theme/page/component底下
* 樣式檔案命名 [Page Name].[Componenet Name].component.scss

### 建立Shared Component

* 使用angular CLI 於src/shared底下建立component，不需要建立任何樣式(.css/.sass/.scss)
* Shared Component樣式統一寫在app/theme/component底下
* Shared元件命名以 gon 開頭 e.g. `gon-lsit-view`
* 樣式檔案命名 [Component Name].component.scss

## Store狀態存取
