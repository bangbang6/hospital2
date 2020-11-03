<template>
    <div style="width: 100%;margin: auto;background-color: #f0f2f5;padding-top:50px">
        <div  class="el-table el-table--fit el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;margin: auto;padding: 20px 20px">

            <el-button type="primary">点击溯源</el-button>
            <el-button icon="el-icon-view" type="primary">预览</el-button>
            <el-button icon="el-icon-download" type="primary">下载</el-button>
            <el-button icon="el-icon-share" type="primary">分享</el-button>
            <el-button icon="el-icon-circle-close" type="danger">删除</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: inline-block;float: right">
                <el-autocomplete
                        class="input-with-select"
                        v-model="input"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入您要查找的文件名"
                        @select="handleSelect"
                >
                    <el-select placeholder="文件类型" v-model="select" slot="prepend" >
                        <el-option label="jpg文件" value=".jpg"></el-option>
                        <el-option label="doc文件" value=".doc"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="onSubmit()"></el-button>
                </el-autocomplete>
            </el-form>
            <el-table
                    ref="multipleTable"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    tooltip-effect="dark"
                    style="height: 450px;"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                >
                </el-table-column>
                <el-table-column
                        prop="fileName"
                        label="文件名"
                        style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;">

                </el-table-column>
                <el-table-column
                        prop="action"
                        label="..."
                        style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
                        width="200px" >
                    <template slot-scope="scope">
                        <div class="action">
                            <el-tooltip class="item" effect="light" content="溯源" placement="bottom-start" style="margin-right: 5px">
                                <el-link icon="el-icon-attract" style="font-size: 18px;color: #409EFF"  @click="getOriginal(scope.$index)"></el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="预览" placement="bottom-start" style="margin-right: 5px">
                                <el-link icon="el-icon-view" style="font-size: 18px;color: #409EFF" @click="seeFile(scope.$index)"></el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="下载" placement="bottom-start" style="margin-right: 5px">
                                <el-link icon="el-icon-download" style="font-size: 18px;color: #409EFF" @click="downloadFile(scope.$index)"></el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="分享" placement="bottom-start" style="margin-right: 5px">
                                <el-link icon="el-icon-share" style="font-size: 18px;color: #409EFF" @click="shareFile(scope.$index)"></el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="删除" placement="bottom-start" style="margin-right: 5px">
                                <el-link icon="el-icon-circle-close" style="font-size: 18px;color: #409EFF" @click="deleteRow(scope.$index)"></el-link>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fileSize"
                        label="文件大小"
                        style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="upload_data"
                        label="上传日期"
                        sortable
                        style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
                        width="150px">
                </el-table-column>
                <el-table-column
                        prop="modifiedData"
                        label="更改日期"
                        sortable
                        style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
                        width="150px">
                </el-table-column>
            </el-table>
            <el-pagination class="fy"
                           layout="prev, pager, next"
                           @current-change="current_change"
                           :total="total"
                           background
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    const totalData = new Array(100).fill('').map((item,index)=>{
        return {
            value:`文件名${index}.doc`,//这里要添加一个字段
            fileName: `文件名${index}.doc`,
            fileSize: '300M',
            upload_data: '2020-10-23',
            modifiedData: '2020-10-24'
        }
    })
    export default {
        data() {
            return {
                input: '',
                select: '',
                total:200,//默认数据总数
                pagesize:7,//每页的数据条数
                currentPage:1,//默认开始页面
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: totalData,
                multipleSelection: [],
                files: [],
                results:[],
            }
        },

        methods: {
            getOriginal(index) {
                this.$alert('这是第' + index + '行文件溯源结果', '文件溯源', {
                    confirmButtonText: '确定'
                })
            },
            downloadFile(index) {
                this.$alert('这是第' + index + '行文件的下载结果', '文件下载', {
                    confirmButtonText: '确定'
                })
            },
            shareFile(index) {
                this.$alert('这是第' + index + '行文件的分享结果', '文件分享', {
                    confirmButtonText: '确定'
                })
            },
            seeFile(index) {
                this.$alert('这是第' + index + '行文件的预览结果', '文件预览', {
                    confirmButtonText: '确定'
                })
            },
            deleteRow(index) {
                this.$alert('这是第' + index + '行文件的删除结果', '文件删除', {
                    confirmButtonText: '确定'
                })
            },
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            querySearch(queryString, cb) {
                let files = this.files;
                let results = queryString ? files.filter(this.createFilter(queryString)) : files;
                // 调用 callback 返回建议列表的数据
                this.results = results;
                cb(results);
            },
            createFilter(queryString) {
                return (file) => {
                    return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                };
            },
            createFilterAndType(queryString,Type) {
                return (file) => {
                    return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1&&file.fileName.toLowerCase().indexOf(Type.toLowerCase()) != -1);
                };
            },
            loadAll() {
                return totalData;
            },
            handleSelect(item) {
                console.log(item);
            },
            onSubmit() {
                let files = this.files;
                let queryString = this.input;
                let Type = this.select;
                this.tableData =  files.filter(this.createFilterAndType(queryString,Type));
            }
        },
        mounted() {
            this.files = this.loadAll();
        }
    }
</script>
<style>
    .el-table--enable-row-hover .el-table__body tr:hover td:nth-child(3) div div {
        visibility: visible;
    }

    .fy{
        width: 400px;
        position: absolute;
        top: 88%;
        left: calc(50% - 200px);
    }
    .el-table--enable-row-hover .el-table__body tr td:nth-child(3) div div{
        visibility: hidden;
    }
    .el-select .el-input {
        width: 120px;
    }
    .el-table th>.cell{
        padding-left: 14px;
    }
</style>