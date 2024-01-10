<template>
  <h1>HelloWorld</h1>
  <Row>
    <Col :span="24" />
  </Row>

  <Row>
    <Col :span="12" />
    <Col :span="12" />
  </Row>

  <Row>
    <Col :span="8" />
    <Col :span="8" />
    <Col :span="8" />
  </Row>

  <Row>
    <Col :span="6" />
    <Col :span="6" />
    <Col :span="6" />
    <Col :span="6">
      <input ref="fileInput" type="file" />

      <Input type="file" @input="inputFileUpload" />
      <Input type="file" multiple @input="inputFilesUpload" />
    </Col>
  </Row>
</template>

<script setup lang="ts">
  import { Col, Row, Input } from 'ant-design-vue'
  import {
    getPersonById,
    queryPerson,
    formUrl,
    json,
    formData,
    uploadFile,
    uploadFiles
  } from '../../api/demo'
  import { onMounted, ref } from 'vue'
  import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'

  // 上传文件批量
  async function inputFilesUpload(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    Array.prototype.forEach.call(files, (item) => {
      data.append('bbb', item)
    })

    const res = await uploadFiles(data)

    console.log(res)
  }
  // 上传文件单个
  async function inputFileUpload(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.set('aaa', files[0])
    const res = await uploadFile(data)

    console.log(res)
  }

  async function sendUrlParam() {
    const res = await getPersonById('/123')
    console.log(res)
  }

  async function sendQuery() {
    const res = await queryPerson({
      name: 'query',
      age: 21
    })
    console.log(res)
  }

  async function sendFormUrlEncode() {
    const res = await formUrl({
      name: 'formUrlEncode',
      age: 18
    })
    console.log(res)
  }

  async function sendJson() {
    const res = await json({
      name: 'json',
      age: 19
    })
    console.log(res)
  }

  const fileInput = ref()
  async function sendformData() {
    const data = new FormData()
    data.set('name', 'form-data')
    data.set('age', '20')
    data.set('file1', fileInput.value.files[0])
    data.set('file2', fileInput.value.files[1])

    const res = await formData(data)
    console.log(res)
  }

  onMounted(() => {
    sendUrlParam()
    sendQuery()
    sendFormUrlEncode()
    sendJson()
    fileInput.value.onchange = sendformData
  })
</script>
