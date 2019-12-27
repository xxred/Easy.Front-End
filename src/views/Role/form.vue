<template>
  <div
    v-loading="dataLoading"
    class="detail"
  >
    <h2 style="margin-left: 20px;">{{ textMap[type] }}</h2>
    <div class="con-box">
      <div class="add">
        <div class="form">
          <el-form
            ref="form"
            :model="temp"
            :rules="rules"
            label-width="116px"
            size="mini"
          >
            <div class="form-box">
              <el-form-item
                label="名称"
                prop="Name"
              >
                <el-col :span="20">
                  <el-input v-model="temp.Name" />
                </el-col>
              </el-form-item>
              <el-form-item
                label="说明"
                prop="Remark"
              >
                <el-col :span="20">
                  <el-input v-model="temp.Remark" />
                </el-col>
              </el-form-item>
            </div>
          </el-form>
          <template>
            <el-table
              v-if="temp.ID"
              :data="tableData"
              :tree-props="{
                children: 'Childs',
                hasChildren: 'hasChildren'
              }"
              style="width: 100%;margin: 100px 0 70px 90px;"
              row-key="ID"
              border
              default-expand-all
            >
              >
              <el-table-column
                prop="DisplayName"
                label="名称"
                width="180"
              />
              <el-table-column
                label="授权"
                width="60"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.ParentID != 0">
                    <el-checkbox v-model="checkList['p' + scope.row.ID]" />
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span
                    v-for="(item, k) in scope.row.Permissions"
                    :key="k"
                  >
                    <el-checkbox
                      :label="k"
                      v-model="checkList['pf' + scope.row.ID + '_' + k]"
                    >{{ item }}</el-checkbox>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>

      <div class="foot-btn">
        <div style="position: fixed;margin:20px;float:right;bottom: 0px;right: 0px;z-index: 1;">
          <el-button @click="returnIndex">取消</el-button>
          <el-button
            type="primary"
            @click="onSubmit('form')"
          >确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createData, updateData, queryData } from 'src/api/base'

export default {
  // name: 'index',
  data() {
    return {
      checkList: {},
      temp: {
        Name: '',
        Remark: '',
        Resources: []
      },
      rules: {
        Name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        Remark: [{ required: true, message: '请输入说明', trigger: 'blur' }]
      },
      checkCount: ['1', '2', '4', '8'],
      tableData: [],
      roleList: [],
      datasearch: {},
      method: { Edit: 'put', Add: 'post' },
      textMap: {
        Edit: '编辑',
        Add: '新增'
      },
      dataLoading: true
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    tableName() {
      return this.$route.params.tableName
    },
    type() {
      return this.$route.params.type
    },
    isAdd() {
      return this.type === 'Add'
    }
  },
  created() {
    this.getData()
    this.getAllMenu()
  },
  methods: {
    returnIndex() {
      this.$router.push(`/${this.tableName}/Index`)
    },
    onSubmit(formName) {
      if (this.temp.ID) {
        // 编辑
        this.checkList.ID = this.temp.ID
        this.checkList.Name = this.temp.Name
        this.checkList.Remark = this.temp.Remark
        updateData(this.tableName, this.checkList).then(res => {
          if (res.data.Status === 0) {
            this.$message.success('操作成功')
            this.returnIndex()
          }
        })
      } else {
        // 新增
        this.$refs[formName].validate(valid => {
          if (valid) {
            createData(this.tableName, this.temp).then(res => {
              if (res.data.Status === 0) {
                this.$message.success('操作成功')
                this.returnIndex()
              }
            })
          }
        })
      }
    },
    getData() {
      if (this.isAdd) {
        this.dataLoading = false
        return
      }
      queryData(this.tableName, this.id).then(res => {
        this.temp = res.data.Data
        this.dataLoading = false
        this.checkboxList()
      })
    },
    getAllMenu() {
      if (this.isAdd) {
        return
      }
      this.$axios.get('/api/Menu/GetAllMenu').then(res => {
        this.tableData = res.data.Data

        this.tableData.map(i => {
          // console.log(i)
          i.Childs.map(j => {
            // this.checkList['p'+j.id] = true
            this.$set(this.checkList, 'p' + j.ID, true)
          })
        })
      })
    },
    checkboxList() {
      // console.log(this.item)
      this.temp.Resources.map(i => {
        this.checkCount.map(j => {
          var week = j & this.temp.Permissions[i]
          var weekstring = week.toString()
          if (week !== 0) {
            // this.checkList['pf'+i+'_'+weekstring] = true;
            this.$set(this.checkList, 'pf' + i + '_' + weekstring, true)
          }
        })
      })
    }
  }
}
</script>
<style>
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1f7e52 !important;
  border-color: #1f7e52 !important;
}
.el-checkbox__inner:hover {
  border-color: #1f7e52 !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #1f7e52 !important;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-col-20 {
  text-align: left;
}
.form-box .el-form-item {
  width: 615px;
  float: left;
}
</style>
