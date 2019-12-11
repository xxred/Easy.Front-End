<template>
  <div>
    <h2 style="margin-left: 20px;">{{ textMap[type] }}</h2>
    <slot :columns="columns" name="formColumns">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 50px; margin-bottom: 75px;"
      >
        <template v-for="(column, idx) in columns">
          <el-form-item
            v-if="column.Name.toLowerCase() != 'id'"
            :key="idx"
            :label="column.DisplayName"
            :prop="column.Name"
          >
            <el-switch
              v-if="column.TypeStr == 'Boolean'"
              v-model="temp[column.Name]"
              style="display: block"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            />

            <el-date-picker
              v-else-if="column.TypeStr == 'DateTime'"
              v-model="temp[column.Name]"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            />

            <el-input
              v-else
              v-model="temp[column.Name]"
              :placeholder="'请输入' + column.DisplayName"
              type="text"
            />
          </el-form-item>
        </template>
      </el-form>
    </slot>
    <div slot="footer" class="dialog-footer">
      <slot name="dialogFooter">
        <div
          style="position: fixed; margin:20px; float:right; bottom: 0px; right: 0px; z-index: 1;"
        >
          <el-button @click="returnIndex">取消</el-button>
          <el-button
            type="primary"
            @click="type === 'Add' ? createData() : updateData()"
          >确认</el-button
          >
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { createData, updateData, queryData, getColumns } from '../../api/base'
export default {
  name: 'FormBase',
  data() {
    return {
      temp: {},
      columns: null,
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
    this.getColumns()
    this.getData()
  },
  methods: {
    getColumns() {
      getColumns(this.tableName).then(res => {
        this.columns = res.data.Data
        if (this.isAdd) {
          this.dataLoading = false
        }
      })
    },
    getData() {
      if (this.isAdd) {
        return
      }
      queryData(this.tableName, this.id).then(res => {
        this.temp = res.data.Data
        this.dataLoading = false
      })
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          createData(this.tableName, this.temp).then(() => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.returnIndex()
          })
        }
      })
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateData(this.tableName, tempData).then(() => {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.returnIndex()
          })
        }
      })
    },
    returnIndex() {
      this.$router.push(`/${this.tableName}/Index`)
    }
  }
}
</script>
