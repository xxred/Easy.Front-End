<template>
  <el-form
    ref="dataForm"
    :model="temp"
    label-position="left"
    label-width="120px"
    style="width: 400px; margin-left:50px;"
  >
    <el-form-item
      v-for="(column, idx) in columns"
      :key="idx"
      :label="column.DisplayName"
      :prop="column.Name"
    >

      <el-switch
        v-if="column.TypeStr=='Boolean'"
        v-model="temp[column.Name]"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="是"
        inactive-text="否"
      />

      <el-date-picker
        v-else-if="column.TypeStr=='DateTime'"
        v-model="temp[column.Name]"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
      />

      <el-input
        v-else
        v-model="temp[column.Name]"
        type="text"
        :placeholder="'请输入'+column.DisplayName"
      />

    </el-form-item>

  </el-form>

</template>
<script>
export default {
  name: 'FormBase',
  props: ['columns', 'temp']
}
</script>
