<template>
  <div>
    <h2>{{ textMap[type] }}</h2>
    <slot :columns="columns" name="formColumns">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
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
        <el-button @click="returnIndex">取消</el-button>
        <el-button
          type="primary"
          @click="type === 'Add' ? createData() : updateData()"
        >确认</el-button
        >
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
      columns: {},
      textMap: {
        Edit: '编辑',
        Add: '新增'
      }
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
      })
    },
    getData() {
      queryData(this.tableName, this.id).then(res => {
        this.temp = res.data.Data
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
