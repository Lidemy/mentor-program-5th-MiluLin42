## 跟我朋友菜哥介紹 Git
使用Git來進行版本控制，假如今天你想要紀錄笑話，因為笑話太多，同一個笑話還會有許多版本的更新，這時候就可以使用Git，Git可以記錄你各個版本的笑話，以及每個版本更新的時間、作者、修改了那些，非常方便管理。
1. 首先，你可以先建立一個資料夾 : 'mkdir jokes'
2. 接著先切換到新增的資料夾裡 : 'cd jokes'
3. 再把這個資料夾加進local端資料庫 : 'git init'
4. 現在要開始將你所有的笑話新增進去，一個笑話一個文件 : 'touch joke1'　'touch joke2' ...等
5. 到這裡你已經把你目前的笑話都記錄起來了
6. 再把你的笑話全部都加進版本控制 : 'git add .'
7. 提交你目前笑話的版本 : 'git commit "2021jokes"'
8. 再來請先到Github上註冊，並且新增一個new repository
9. 把你的Github資料庫設成你的遠端資料庫 : 'git remote add origin http://github.com/"你的帳號"/"資料庫名" 
10. 再把你目前的笑話版本提交到 github 上 : 'git push -u origin master'
11. 就可以在遠端數據庫儲存自己的git，
12. 也可以把在遠端數據庫的git拉下來到自己的本地數據庫 : 'git pull　origin master'
13. 那如果之後你有想要修改的笑話，比如笑話1想要更貼近時事修改人名，或是新增一個新的笑話，可以新增一個分支 : 'git branch "update version"' ，這時候你可以將你想修改的笑話一一修改、新增，
14. 等到你覺得修改得差不多了，可以變成目前的全新笑話版本，再把這個分支合併回去你的主要笑話版本 : 'git merge update version'
這樣很簡單的就可以用Git去管理你的每一個笑話版本囉！