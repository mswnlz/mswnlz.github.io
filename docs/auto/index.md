# auto
此项目自动化相关（涉及到的工具，vscode+cline插件+各种AI的key，下面主要使用了DeepSeek，Gemini等）

------

# 一、生成url.txt url文件

 复制要批量转存和转发生成url的所有文本bbbb，然后进入vs + cline插件中，写下下面这段prompt

@/url.txt  清空原来的文件，把下面这段文本，截取出url，每个URL一行，如果url，没有https:// ，则前面加上，确保url是完整的是合法url，保存到url.txt文件中

------

# 二、执行批量转存工具

1. python python quark.py
2. 按步骤，完成生成批量的转发URL

------

# 三、按⬇️的mcp的prompt，实现github的自动识别分类及仓库提交

----------

## MCP自动判别，资源仓库类别，实现自动化提交及生成相关文件等操作的prompt


获取用户mswnlz存在哪些github仓库，一定把mswnlz.github.io仓库排除掉，注意下面所有都跟这个仓库没关系，先分析这些github仓库的特征及格式到写法，然后判断下面输入的这些文件描述和链接，分别所属的类别，对应到最相关的仓库中，进行修改对应文件及相关操作，完成提交github版本记录
具体要求如下，请严格执行
	1	具体操作的仓库名称需要你根据资源名称去判断，放到哪个仓库中，一定是在现有的这些仓库中去找去尽量匹配，如果没有严格匹配的，就相对的匹配，放在相对匹配的库中去操作，不允许新开仓库
	2	我提供的是资源名称和url，需要你先转成markdown格式，然后做下面的事情
	3	对应到仓库，首先判断当前年月份有没有对应的文件名， 1）如果没有对应以当前年月命名的md文件，则按年月追加到仓库中，文件名格式比如 2025 年 6月，则 202506.md 2）有的话，则直接修改对应的文件内容，记得先获取文件的sha值（至于怎么获取到，你自己想办法你可以做到的，比如看之前的commit记录中或者其他办法等），然后修改后，提交的时候，需要在json里面填写这个sha值，这是必须的字段，另外，把要增加的内容，追加到文件内容的最下面
	4	判断年月md文件在仓库的readme.md文件中有没有索引，没有的话加上年月md的索引，加的位置在readme文件的多语言下面追加，同时，如果已经有其他年月的md索引，要放在原有的年月md前面，这样按时间倒序，新加的年月md在前面，原来的年月md在后面，另外保证进到仓库中，通过readme文件，能点击链接到这个仓库的其他文件中，然后链接名字就叫这个md文件名即可，也就是年月的名字
	5	所有这些格式都按照markdown格式填写到文件中及做文件修改
	6	提交仓库的版本说明中，要填写除去链接外的提交的文本内容，这样能很好知道这次提交的相关详细内容是什么，可以详细一些，不要只是概要的几个字，比如： 微信视频号下载工具 (稀有版，无限制) | https://pan.quark.cn/s/b0db800df5b9，则删除链接后的提交说明是：增加  微信视频号下载工具 (稀有版，无限制) ，如果仓库提交了多个资源，则增加多个文本，每个文本单独一行即可，都放在提交版本说明中，字数多没关系
	7	提交仓库版本时，因为仓库设定了提交的branchi和提交内容的描述，所以务必，注意每次提交的json格式里面，都要有增加这两个字段，不然提交github会不成功；
"message": "更新 README.md 内容", // 新增：提交说明中，要填写除去链接外的提交的文本内容，这样能很好知道这次提交的相关内容是什么 "branch": "main" // 新增：目标分支名



0成本用国内身份证注册SafePal万事达卡：GCP/Cloudflare绑卡实测保姆级教程
https://s.869hr.uk/2hm


11 | 97家有喜事 1080p remux (1997) | https://pan.quark.cn/s/af58f9727601
12 | 355：谍影特攻 2160p remux (2022) | https://pan.quark.cn/s/6b308cbfc474
13 | 760号犯人 2160p remux (2021) | https://pan.quark.cn/s/2ec618dff3a9
14 | 八佰 1080p remux (2020) | https://pan.quark.cn/s/cec6507e01ad
15 | 2012 2160p remux (2009) | https://pan.quark.cn/s/053de56766bd


2025年高考真题汇总
链接：https://pan.quark.cn/s/30cbbea7d56a

----------

# 四、配置了github workflow action，自动发送更新的资源到TG群组：

![image](https://github.com/user-attachments/assets/33d8cd8d-36ca-451d-a783-3d4362601a6b)


----------

# 五、自动发推


<img width="587" alt="iShot_2025-06-17_09 34 40" src="https://github.com/user-attachments/assets/a5141896-840e-44f2-96c3-ea9b0900c504" />


### 一
安装库：npm install @actions/core twitter-api-v2
工程位置：https://github.com/PLhery/node-twitter-api-v2

### 二
获取推特官方API token：https://developer.x.com/en


------------------
# 六，基于github仓库，做了个网站，https://doc.869hr.uk
<img width="1103" alt="image" src="https://github.com/user-attachments/assets/921f54d6-82b2-4376-8594-cca9ac968d4f" />
并支持搜索
<img width="1091" alt="image" src="https://github.com/user-attachments/assets/500c9118-7366-43da-a6d5-324f69c4ca32" />


---------------

# 待办TODO

自动生成转存地址，需要mcp server封装，或者n8n等的api调用，
可以改造工程，夸克批量转存这个Python：https://github.com/ihmily/QuarkPanTool?tab=readme-ov-file

----------
