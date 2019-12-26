# mobile3

```
# 安装依赖
npm install

# 运行本地环境
npm run dev


# 打包之前 第一次 需要将 mobile3-release clone 到本地
#  mobile3-release npm install 安装依赖
# master develop release 保证三个分支可以拉取和提交

# 打包测试环境
# 输出到mobile3-release项目develop分支
npm run build:test

# 打包预生产环境
# 输出到mobile3-release项目release分支
npm run build:release

# 打包正式环境
# 输出到mobile3-release项目master分支
npm run build

# 发布（瓦力平台）
# 测试环境 - mobile3-test-release
# 预生产环境 - mobile3-release
# 正式环境 - mobile3-prod-release
```
