<template>
  <table-base ref="tableBase" :table-name="tableName">
    <template slot="tableColumns">
      <el-table-column label="编号" type="index" />
      <el-table-column label="菜单名" prop="Name" />
      <el-table-column label="显示名" prop="DisplayName" />
      <el-table-column label="链接" prop="Url" />
      <el-table-column label="排序" prop="Sort" width="50" />
      <el-table-column label="可见" prop="Visible" width="80">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row['Visible']"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column label="必要" prop="Necessary" width="80">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row['Necessary']"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column label="权限子项" prop="Permission" />
    </template>
  </table-base>
</template>
<script>
const tableName = 'Menu'
export default {
  name: tableName,
  data() {
    return {
      tableName: tableName
    }
  }
}
</script>
