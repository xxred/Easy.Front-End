<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="请输入关键字"
        v-model="listQuery.title"
        style="width: 200px;margin-right: 10px;"
        class="filter-item"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >新增</el-button>
    </div>

    <el-table :data="data">
      <el-table-column
        v-for="(column, idx) in tableColumns"
        :label="column.label"
        :prop="column.prop"
        :key="idx"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="name" prop="name">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.name"
            type="text"
            placeholder="请输入名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  searchData,
  queryData,
  createData,
  updateData,
  deletData
} from "@/api/base";
export default {
  name: "TableBase",
  props: ["data", "tableColumns", "tableName"],
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: "",
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      temp: {},
      textMap: {
        update: "编辑",
        create: "新增"
      }
    };
  },
  methods: {
    createData() {
      this.$refs["dataForm"].validate(valid => {
        console.log("创建。。。。。。");
        if (valid) {
          createData(this.tableName, this.temp).then(() => {
            console.log("创建。。。。。。");
            this.data.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.data.indexOf(row);
      this.data.splice(index, 1);
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {};
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateArticle(tempData).then(() => {
            for (const v of this.data) {
              if (v.id === this.temp.id) {
                const index = this.data.indexOf(v);
                this.data.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    }
  }
};
</script>
