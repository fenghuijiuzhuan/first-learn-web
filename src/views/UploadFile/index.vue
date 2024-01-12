<template>
  <h1>文件上传</h1>

  <Row>
    <Col :span="12" :order="2"> 单个文件上传 </Col>
    <Col :span="12" :order="1">
      <Input type="file" @input="inputFileUpload" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 多个文件上传 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputFilesUpload" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 多个文件上传且多文件字段 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputUploadFilesManyKey" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 多个文件上传且任意文件字段 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputUploadFilesAnyKey" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 多个文件上传且任意文件字段使用storage </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputUploadFilesAnyKeyStorage" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 上传文件单个 限制文件大小 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputFileUploadSize10k" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 上传文件单个 限制文件大小10k只能是png格式 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputFileUploadSize10kPng" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 上传文件单个 限制文件大小10k 后端自定义校验方法 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputFileUploadSize10k2" />
    </Col>
  </Row>

  <Row>
    <Col :span="12" :order="2"> 大文件切片上传 </Col>
    <Col :span="12" :order="1">
      <Input type="file" multiple @input="inputUploadFilesSlice" />
    </Col>
  </Row>
</template>

<script setup lang="ts">
  import { Col, Row, Input } from 'ant-design-vue'
  import {
    uploadFile,
    uploadFiles,
    uploadFilesManyKey,
    uploadFilesAnyKey,
    uploadFilesAnyKeyStorage,
    uploadFileSize10k,
    uploadFileSize10kPng,
    uploadFileSize10k2,
    uploadFilesSlice,
    uploadFilesSliceMerge
  } from '../../api/demo'
  import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
  //  大文件切片上传
  async function inputUploadFilesSlice(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const file = files[0]
    console.log(file)
    const chunks: Blob[] = []
    const chunkSize = 20 * 1024
    let startPos = 0
    while (startPos < file.size) {
      chunks.push(file.slice(startPos, startPos + chunkSize))
      startPos += chunkSize
    }

    const randomStr = Math.random().toString().slice(2, 8)

    const tasks: Array<Promise<any>> = []
    chunks.map((chunk, index) => {
      const data = new FormData()
      data.set('name', randomStr + '_' + file.name + '-' + index)
      data.append('files', chunk)
      tasks.push(uploadFilesSlice(data))
    })
    await Promise.all(tasks)
    uploadFilesSliceMerge({ name: randomStr + '_' + file.name })
  }

  // 上传文件单个 限制文件大小png 10k
  async function inputFileUploadSize10k2(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.set('aaa', files[0])
    const res = await uploadFileSize10k2(data)

    console.log(res)
  }

  // 上传文件单个 限制文件大小png 10k
  async function inputFileUploadSize10kPng(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.set('aaa', files[0])
    const res = await uploadFileSize10kPng(data)

    console.log(res)
  }

  // 上传文件单个 限制文件大小
  async function inputFileUploadSize10k(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.set('aaa', files[0])
    const res = await uploadFileSize10k(data)

    console.log(res)
  }

  // 上传文件传任意字段
  async function inputUploadFilesAnyKeyStorage(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.append('aaa', files[0])
    data.append('bbb', files[1])
    data.append('ccc', files[2])
    data.append('ddd', files[3])

    const res = await uploadFilesAnyKeyStorage(data)
    console.log(res)
  }

  // 上传文件传任意字段
  async function inputUploadFilesAnyKey(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.append('aaa', files[0])
    data.append('bbb', files[1])
    data.append('ccc', files[2])
    data.append('ddd', files[3])

    const res = await uploadFilesAnyKey(data)
    console.log(res)
  }

  // 上传文件批量且使用多个文件字段
  async function inputUploadFilesManyKey(e: ChangeEvent) {
    const files: FileList = (e.target as any).files
    const data = new FormData()
    data.set('name', 'yvan')
    data.set('age', '18')
    data.append('aaa', files[0])
    data.append('aaa', files[1])
    data.append('bbb', files[2])
    data.append('bbb', files[3])

    const res = await uploadFilesManyKey(data)
    console.log(res)
  }

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
</script>
