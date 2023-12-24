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
    <Col :span="6" />
  </Row>
</template>

<script setup lang="ts">
  import { Col, Row } from 'ant-design-vue'
  import { getPersonById, queryPerson } from '../../api/demo'
  import { onMounted } from 'vue'

  async function getPerson() {
    const res = await getPersonById('/123')
    console.log(res)
  }

  async function queryPersonByPerson() {
    const res = await queryPerson({
      name: '嘎嘎嘎',
      age: 21
    })
    console.log(res)
  }

  onMounted(() => {
    getPerson()
    queryPersonByPerson()
  })
</script>
