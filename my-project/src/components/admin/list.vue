<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="60px">
      <el-form-item label="游戏id">
        <el-input v-model.trim="form.game_id"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option value="">请选择</el-option>
          <el-option value="0" label="未启用"></el-option>
          <el-option value="1" label="启用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增活动配置</el-button>
      </el-form-item>
    </el-form>
    <h2>大文件上传</h2>
    <input type="file" id="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="id" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" align="center" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="game_id" align="center" label="游戏id">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "启用" : "未启用" }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.update_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" label="更新人" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="yulanItem(scope.row.id)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import upload from "@/api/upload"
  import merge from "@/api/merge"
  const LENGTH =10;
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: "天姬变抽奖活动一期",
            game_id: "123456789",
            status: 1,
            update_time: 1616999797,
            updater: "王自立",
          },
        ],
        form: {
          game_id: '',
          status: '',
        },
        container:{
          file:null,
          data:[]
        }
      };
    },
    methods: {
      editItem(id) {
        this.$router.push({ path: "/", query: id });
      },
      yulanItem(id) {
        this.$router.push({ path: "/", query: id });
      },
      handleFileChange(e) {
        const [file] = e.target.files;
        if (!file) return;
        Object.assign(this.$data, this.$options.data());
        this.container.file = file;
        
      },
      createFileChunk(file,length=LENGTH){
        // 生成文件切片
        const fileChunkList = [];
        const chunkSize = Math.ceil(file.size / length);
        let cur = 0;
        while(cur<file.size){
          fileChunkList.push({file:file.slice(cur,cur+chunkSize)})
          cur += chunkSize;
        }
        return fileChunkList;
      },
      //上传切片
      async uploadChunks(){
        const requestList = this.container.data.map(({chunk,hash})=>{
          const formData = new FormData();
          formData.append("chunk",chunk);
          formData.append("hash",hash);
          formData.append("filename",this.container.file.name);
          return {formData}
        }).map(async ({formData})=>{
          upload(formData)
        })
        await Promise.all(requestList) //并发切片
        await this.mergeRequest();
      },
      async mergeRequest(){
        await merge(this.container.data)
      },
      async handleUpload(){
        if(!this.container.file) return;
        const fileChunkList = this.createFileChunk(this.container.file);
        this.container.data = fileChunkList.map(({file},index)=>({
          chunk:file,
          hash:this.container.file.name + "-" + index //文件名+数组下标
        }))
        await this.uploadChunks()
      }
    },
    filters: {
      formatDate: function (ns) {
        return new Date(parseInt(ns) * 1000).toLocaleString();
      },
    },
  };
</script>

<style>
  .el-form-item{
    display: inline-block;
  }
</style>