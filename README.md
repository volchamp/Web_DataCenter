# dataCenter-web
数据中台
## 项目介绍
数据中台是企业级大数据通过系统化的方式实现统一、标准、安全、共享的数据组织，以服务化的方式赋能前台数据应用，提高数据的使用效率。主要具有以下功能： 统一的数据源管理、元数据管理、数据标准管理、数据集成和共享、数据质量管理、数据资产管理、数据可视化开发等功能。
本平台主要核心特点：
* 统一数据标准：建立统一的数据公共层（统一数据标准、数据模型、字段）、保障数据口径的规范和统一，提供标准数据输出。
* 统一集成开发：统一数据权限管控规则下，提供一站式数据开发环境，根据业务需求，不断沉淀数据开发工具和算法库到开发环境，减少开发强度。统一调度数据处理任务。
* 统一数据服务：统一规划和提供数据能力服务。根据数据安全等级和不同账户制定数据访问权限，统一管理用户账号、访问权限和数据出口审计。保证数据安全前提下进行数据赋能。
* 统一平台运维：提供数据平台统一运维和运营功能、平台自动化巡检、故障告警、资源监控等，少量工程师可进行高效的平台运维。降低成本提高效率。
## 运行环境要求
* 推荐使用IE10及以上、火狐、谷歌等浏览器
## 功能介绍
### 登录
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/login.png)
### 系统首页
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/home.png)
### 数据源管理
* 平台支持国内外主流关系型数据库的适配，分OLTP的操作关系型数据库（包括Oracle、DB2、SQL Server、Mysql、PostgreSQL、达梦等）、OLAP的联机分析型数据库（比如ClickHouse、实时分析型数据库Doris、非关系型数据库Elasticsearch），大数据的HIVE数仓等。在这个模块下可以进行统一的数据源接入配置，为后面的数据采集、管理和服务提供基础来源。<br>
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/datasource.png)
### 主数据管理
* 主数据是企业的“黄金数据”，具有高价值性、高共享性、相对稳定。是在整个价值链上被重复、共享应用于多个业务流程的、跨越各个业务部门、各个系统之间共享交互的基础数据。平台的主数据管理实现对集中式管理模式下的主数据新增、修改、禁用、启用、审核、分发等一站式管理。对主数据的分类与编码、主数据集成等过程进行统一管理。
### 数据集成
* 数据集成平台主要功能是对数据进行统一的采集、加工和处理，并通过统一的调度引擎支撑各种复杂的任务调度流程高效运行，为海量数据校验和同步提供保障进行统一的任务调度管理。
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/runInfo.png)
### 数据质量
* 数据质量管理用于解决业务系统运行、数据中心建设及数据治理过程中的各种数据质量问题。提供数据质量模型构建，数据质量模型执行，数据质量任务管理，异常数据发现保存以及数据质量报表生成等功能。支持校验规则包括数据格式校验、值域校验、数据范围校验、正则表达式校验、空值校验等。
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/quality.png)
* 检验规则配置
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/rule.png)
### 数据资产
* 数据资产管理功能包含了资产目录和资产编目。资产编目主要可以根据治理各环节进行形成的数据资产进行挂接和编目管理。有元数据管理环节、数据标准形成的模型指标数据、企业的主数据及api服务等。
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/resource.png)
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/resourceInfo.png)
### 数据服务
* 数据服务功能支持对系统数据资产提供共享服务能力，包含数据服务、文件服务和接口服务的共享。通过该功能模块，可将元数据、主数据、指标数据，数据查询等信息进行共享管理，包括查询、创建、删除和发布操作。其中发布后的服务用户可进行申请数据共享。
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/service.png)
### 可视化开发
* 平台的可视化开发支持丰富的数据源连接，能够通过拖拉拽方式快速制作图表，使用户快速分析数据并洞察业务趋势，从而实现业务的改进与优化。
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/visual.png)
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/visual2.png)
### 数据脱敏
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/rule2.png)
### 系统管理
* 用户管理
* 操作日志<br>
![process](https://raw.githubusercontent.com/volchamp/dataCenter-web/master/screenshot/log.png)
## 联系我们
[沃创科技](http://www.volchamp.com.cn/)
