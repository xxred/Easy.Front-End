<template>
  <div class="app-container">
    <div class="filter-container">
      <slot name="filter">
        <el-input
          v-model="listQuery.title"
          placeholder="请输入关键字"
          style="width: 200px;margin-right: 10px;"
          class="filter-item"
        />

        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>

        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >新增</el-button>
      </slot>
    </div>

    <el-table
      v-loading="listLoading"
      :data="dataList"
    >
      <slot name="tableColumns">
        <el-table-column
          v-for="(column, idx) in columns"
          :key="idx"
          :label="column.displayName"
          :prop="column.name"
        />
      </slot>

      <slot name="tableActions">
        <el-table-column
          label="操作"
          align="center"
          width="230"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status != 'deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </slot>

    </el-table>
    <slot name="page">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </slot>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >

      <slot
        name="formColumns"
        :columns="columns"
      >
        <form-base
          ref="formBase"
          :columns="columns"
          :temp="temp"
        />
      </slot>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <slot name="dialogFooter">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogStatus === 'create' ? createData() : updateData()"
          >确认</el-button>
        </slot>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import {
  searchData,
  createData,
  updateData,
  deletData,
  getColumns
} from '../../api/base'
import Pagination from '../../components/Pagination' // Secondary package based on el-pagination
import FormBase from './formBase'

export default {
  name: 'TableBase',
  components: { Pagination, FormBase },
  props: {
    tableData: Array,
    tableColumns: Array,
    tableName: String,
    afterClickAddBtnFun: Function,
    afterClickEditBtnFun: Function
  },
  data() {
    return {
      cols: undefined,
      data: undefined,
      dialogFormVisible: false,
      dialogStatus: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      temp: {},
      textMap: {
        update: '编辑',
        create: '新增'
      },
      total: 0
    }
  },
  computed: {
    columns() {
      if (this.cols) {
        return this.cols
      }
      if (this.tableColumns) {
        this.setCols(this.tableColumns)
        return this.cols
      }
      this.getColumns()
      return this.cols
    },
    dataList() {
      if (this.data) {
        return this.data
      }

      if (this.tableData) {
        this.setData(this.tableData)
        return this.data
      }

      this.getList()
      return this.data
    },
    dataForm() {
      let formBase = this.$refs['formBase']
      if (!formBase) return null
      let dataForm = formBase.$refs['formBase']
      if (!dataForm) {
        return null
      }

      return dataForm
    }
  },
  created() {},
  methods: {
    createData() {
      this.dataForm.validate(valid => {
        if (valid) {
          createData(this.tableName, this.temp).then(() => {
            this.data.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    async getColumns() {
      var response = await getColumns(this.tableName)
      this.cols = response.data.data
    },
    async getList() {
      this.listLoading = true
      var paper = {
        orderBy: this.listQuery.sort,
        pageIndex: this.listQuery.page,
        pageSize: this.listQuery.limit,
        retrieveTotalCount: true
      }
      var response = await searchData(this.tableName, paper, {})

      this.data = response.data.data
      this.total = response.data.paper.totalCount

      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      if (this.afterClickAddBtnFun) {
        this.afterClickAddBtnFun()
      } else {
        let df = this.dataForm
        if (df) {
          this.$nextTick(() => {
            df.clearValidate()
          })
        }
      }
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletData(this.tableName, row.id).then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            const index = this.data.indexOf(row)
            this.data.splice(index, 1)
          })
        })
        .catch(() => {})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      if (this.afterClickEditBtnFun) {
        this.afterClickEditBtnFun(row)
      } else {
        let df = this.dataForm
        if (df) {
          this.$nextTick(() => {
            df.clearValidate()
          })
        }
      }
    },
    resetTemp() {
      this.temp = {}
    },
    setCols(cols) {
      this.cols = cols
    },
    setData(data) {
      this.data = data
    },
    updateData() {
      this.dataForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateData(this.tableName, tempData).then(() => {
            for (const v of this.data) {
              if (v.id === this.temp.id) {
                const index = this.data.indexOf(v)
                this.data.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
