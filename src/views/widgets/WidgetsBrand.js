import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAirplaneMode, cibLinkedin, cibTwitter, cilAvTimer } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = ({ withCharts }) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={<CIcon icon={cilAirplaneMode} height={52} className="my-4 text-white" />}
          values={[{ title: '空降验证' }]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
          onClick={() => window.open('/#/airborne/availability', '_self')}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={<CIcon icon={cilAvTimer} height={52} className="my-4 text-white" />}
          values={[{ title: '空降时间计算' }]}
          style={{
            '--cui-card-cap-bg': '#8A2BE2',
          }}
          onClick={() => window.open('/#/airborne/time', '_self')}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
