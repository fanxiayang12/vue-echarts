import axiosSrv from '@/plugin/axios'

export default {
  menus() {
    return [{
        'title': '项目管理',
        'href': 'project.index',
        'icon': 'fa fa-list'
      }, {
        'title': '术语库',
        'href': 'hospital.index',
        'icon': 'fa fa-database'
      },
      {
        'title': 'NLP处理',
        'href': 'nlp',
        'icon': 'fa fa-yelp',
        'items': [{
          'title': '术语',
          'href': 'nlp.index',
          'icon': 'fa fa-hashtag',
          'items': null
        }]
      }, {
        'title': '诊断标准化',
        'href': 'diagnosisTerm',
        'icon': 'fa fa-th',
        'items': [{
            'title': '术语',
            'href': 'diagnosisTerm.index',
            'icon': 'fa fa-hashtag'
          }, {
            'title': '术语映射',
            'href': 'diagnosisTerm.mapping',
            'icon': 'fa fa-table'
          },
          {
            'title': '术语标准化',
            'href': 'diagnosisTerm.termStandardization',
            'icon': 'fa fa-check'
          }, {
            'title': '数据源',
            'href': 'diagnosisTerm.source',
            'icon': 'fa fa-database'
          }, {
            'title': '任务列表',
            'href': 'diagnosisTerm.task',
            'icon': 'fa fa-tasks'
          }
        ]
      }, {
        'title': '系统设置',
        'href': 'setting',
        'icon': 'fa fa-cogs',
        'items': [{
          'title': '术语',
          'href': 'terminology.index',
          'icon': 'fa fa-hashtag',
          'items': null
        }]
      }
    ]
  },
  logout() {
    return axiosSrv.post('/api/admin/logout', {})
  }
}