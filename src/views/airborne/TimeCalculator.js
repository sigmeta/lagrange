import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CRow,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import copy from 'copy-to-clipboard'

const TimeCal = () => {
  const [startX, setStartX] = useState('')
  const [startY, setStartY] = useState('')
  const [targetX, setTargetX] = useState('')
  const [targetY, setTargetY] = useState('')
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')
  const [morev, setMoreV] = useState('')
  const [basemsg, setBasemsg] = useState('')
  const [statusMessage, setStatusMessage] = useState([])
  const [statusStyle, setStatusStyle] = useState('text-black bg-light py-5')
  const velocity = [
    1250, 2000, 2300, 2500, 2737, 2875, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000,
  ]

  const distance = (ax, ay, bx, by) => {
    return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    var sx = Number(startX)
    var sy = Number(startY)
    var tx = Number(targetX)
    var ty = Number(targetY)

    var dis = distance(sx, sy, tx, ty)
    var endTime = Number(hour) * 3600 + Number(minute) * 60 + Number(second)
    var vs = morev.split(/[,，]/)
    for (var i in vs) {
      var n = Number(vs[i])
      if (!isNaN(n) && n != 0) {
        velocity.push(n)
      }
    }
    velocity.sort(function (a, b) {
      return a - b
    })

    var res = []
    for (var i in velocity) {
      var t = endTime - Math.round((dis * 10000) / velocity[i])
      var h = parseInt(t / 3600)
      var m = parseInt((t / 60) % 60)
      m = m.toString().padStart(2, '0')
      var s = t % 60
      s = s.toString().padStart(2, '0')
      var num = 1 + Number(i)
      res.push('' + num + '. ' + velocity[i] + '曲速起飞 [' + h + ':' + m + ':' + s + ']')
    }
    setBasemsg('起飞位置：(' + sx + ',' + sy + ')，落地位置：(' + tx + ',' + ty + ')')
    setStatusMessage(res)
  }

  const handleClick = (event) => {
    event.preventDefault()
    copy(basemsg + '\n' + statusMessage.join('\n'))
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>空降时间计算器</h1>
                    <p className="text-medium-emphasis">请输入坐标计算空降起飞时间</p>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">起飞点坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="startX"
                            required
                            value={startX}
                            onChange={(event) => setStartX(event.target.value)}
                          />
                          <CFormInput
                            id="startY"
                            required
                            value={startY}
                            onChange={(event) => setStartY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">落点坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="targetX"
                            required
                            value={targetX}
                            onChange={(event) => setTargetX(event.target.value)}
                          />
                          <CFormInput
                            id="targetY"
                            required
                            value={targetY}
                            onChange={(event) => setTargetY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">
                        更多速度（逗号分隔）
                      </CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="morev"
                            value={morev}
                            onChange={(event) => setMoreV(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">落地时间</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="hour"
                            required
                            value={hour}
                            onChange={(event) => setHour(event.target.value)}
                          />
                          <CFormInput
                            id="minute"
                            required
                            value={minute}
                            onChange={(event) => setMinute(event.target.value)}
                          />
                          <CFormInput
                            id="second"
                            required
                            value={second}
                            onChange={(event) => setSecond(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <br />
                    <CRow>
                      <div className="d-grid gap-2 col-8 mx-auto">
                        <CButton color="primary" className="px-4" type="submit">
                          提交
                        </CButton>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className={statusStyle}>
                <CCardBody className="text-center">
                  <CRow>
                    <div className="d-grid gap-2 col-8 mx-auto">
                      <CButton color="dark" className="px-4" onClick={handleClick}>
                        一键复制
                      </CButton>
                    </div>
                  </CRow>
                  <div>
                    <p>{basemsg}</p>
                    <CListGroup>
                      {statusMessage.map((m, index) => (
                        <CListGroupItem key={index}>{m}</CListGroupItem>
                      ))}
                    </CListGroup>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default TimeCal
