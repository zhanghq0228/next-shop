import * as React from 'react'
import { useState } from 'react'
import styles from './ToimeLogPage.module.scss'
import * as dayjs from 'dayjs'
// import { cloneDeep } from '@microsoft/sp-lodash-subset'
// import { stubFalse, values } from 'lodash'
import { Dropdown, Icon } from 'office-ui-fabric-react'
// import { sp } from 'sp-pnp-js'
import Items from './Item'

const record = {
  projectId: -1,
  hours: 0,
  notes: '',
  total: 0,
  id: -1,
  activityDate: '',
  projectBorderHighlight: false,
  hoursBorderHightlight: false
}
// 深拷贝 兼容数组
function isObject(obj) {
  return typeof obj === 'object' && obj != null
}
const cloneDeep = source => {
  if (!isObject(source)) return source // 非对象返回自身
  const target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key]) // 注意这里
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

const TimeLogPage = props => {
  const days = 5
  const beginDate = dayjs().add(-1, 'day')
  const endDate = dayjs().add(4, 'day')

  const [accountNames, setAccountNames] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [mondayProjects, setMondayProjects] = React.useState([])
  const [tuesdayProjects, setTuesdayProjects] = React.useState([])
  const [wednesdayProjects, setWednesdayProjects] = React.useState([])
  const [thursdayProjects, setThursdayProjects] = React.useState([])
  const [fridayProjects, setFridayProjects] = React.useState([])
  const [saturdayProjects, setSaturdayProjects] = React.useState([])
  const [sundayProjects, setSundayProjects] = React.useState([])
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const listItem = [
    { weekday: 1, name: mondayProjects, addFn: setMondayProjects },
    { weekday: 2, name: tuesdayProjects, addFn: setTuesdayProjects },
    { weekday: 3, name: wednesdayProjects, addFn: setWednesdayProjects },
    { weekday: 4, name: thursdayProjects, addFn: setThursdayProjects },
    { weekday: 5, name: fridayProjects, addFn: setFridayProjects },
    { weekday: 6, name: saturdayProjects, addFn: setSaturdayProjects },
    { weekday: 0, name: sundayProjects, addFn: setSundayProjects }
  ]

  console.log(listItem)
  const initRecords = async (firstDate, lastDate) => {
    const tempRecords = await props.spService.getRecords(firstDate, lastDate)
    console.log(tempRecords.value)
    if (tempRecords.value[0] !== undefined) {
      setIsSubmitted(tempRecords.value[0].IsSubmitted)
    }
    for (let i = 0; i < tempRecords.value.length; i++) {
      const mapItem = listItem.filter(
        item => item.weekday === dayjs(tempRecords.value[i].ActivityDate).day()
      )[0]
      const newRecord = cloneDeep(record)
      newRecord.notes = tempRecords.value[i].Title
      newRecord.hours = tempRecords.value[i].Hours
      newRecord.projectId = tempRecords.value[i].Project.ID
      newRecord.id = tempRecords.value[i].ID
      newRecord.total = tempRecords.value[i].Hours
      newRecord.activityDate = tempRecords.value[i].ActivityDate
      newRecord.hoursBorderHightlight = false
      newRecord.projectBorderHighlight = false
      mapItem.addFn(prevState => [...prevState, newRecord])
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const tempProjects = await props.spService.getProjects()

      setProjects(tempProjects.value)
      const tempAccountsNames = []
      tempProjects.value.map(pp => tempAccountsNames.push(pp.Account.Title))
      const unique = tempAccountsNames.filter((v, i, a) => a.indexOf(v) === i)
      setAccountNames(unique)
      initRecords(
        beginDate.add(-1, 'day').format('YYYY-MM-DD').concat('T00:00:00Z'),
        endDate.format('YYYY-MM-DD').concat('T00:00:00Z')
      )
    })()
  }, [])

  const addNewProject = (weekday, activityDate) => {
    if (isSubmitted) {
      return
    }
    const mapItem = listItem.filter(i => i.weekday === weekday)[0]
    const newRecord = cloneDeep(record)
    newRecord.activityDate = activityDate
    mapItem.addFn([...mapItem.name, cloneDeep(record)])
  }

  const removeProject = (weekday, index) => {
    if (isSubmitted) {
      return
    }
    console.log('Project Index: ' + index, weekday)
    const mapItem = listItem.filter(i => i.weekday === weekday)[0]
    const { name, addFn } = mapItem
    const data = cloneDeep(name)
    addFn(data.filter((i, j) => j !== index))
  }

  const hoursChange = (index, weekday, value) => {
    const mapItem = listItem.filter(i => i.weekday === weekday)[0]
    const newProject = mapItem.name
    newProject[index].hours = value
    newProject[index].total = value
    mapItem.addFn(newProject)

    // if (weekday === 1) {
    //   const newMondayProjects = [...mondayProjects];
    //   newMondayProjects[index].hours = value;
    //   newMondayProjects[index].total = value;
    //   setMondayProjects(newMondayProjects);
    // } else if (weekday === 2) {
    //   const newTuesdayProjects = [...tuesdayProjects];
    //   newTuesdayProjects[index].hours = value;
    //   newTuesdayProjects[index].total = value;
    //   setTuesdayProjects(newTuesdayProjects);
    // } else if (weekday === 3) {
    //   const newWednesdayProjects = [...wednesdayProjects];
    //   newWednesdayProjects[index].hours = value;
    //   newWednesdayProjects[index].total = value;
    //   setWednesdayProjects(newWednesdayProjects);
    // } else if (weekday === 4) {
    //   const newThursdayProjects = [...thursdayProjects];
    //   newThursdayProjects[index].hours = value;
    //   newThursdayProjects[index].total = value;
    //   setThursdayProjects(newThursdayProjects);
    // } else if (weekday === 5) {
    //   const newFridayProjects = [...fridayProjects];
    //   newFridayProjects[index].hours = value;
    //   newFridayProjects[index].total = value;
    //   setFridayProjects(newFridayProjects);
    // } else if (weekday === 6) {
    //   const newSaturdayProjects = [...saturdayProjects];
    //   newSaturdayProjects[index].hours = value;
    //   newSaturdayProjects[index].total = value;
    //   setSaturdayProjects(newSaturdayProjects);
    // } else if (weekday === 0) {
    //   const newSundayProjects = [...sundayProjects];
    //   newSundayProjects[index].hours = value;
    //   newSundayProjects[index].total = value;
    //   setSundayProjects(newSundayProjects);
    // }
  }

  const notesChange = (index, weekday, value) => {
    if (weekday === 1) {
      const newMondayProjects = [...mondayProjects]
      newMondayProjects[index].notes = value
      setMondayProjects(newMondayProjects)
    } else if (weekday === 2) {
      const newTuesdayProjects = [...tuesdayProjects]
      newTuesdayProjects[index].notes = value
      setTuesdayProjects(newTuesdayProjects)
    } else if (weekday === 3) {
      const newWednesdayProjects = [...wednesdayProjects]
      newWednesdayProjects[index].notes = value
      setWednesdayProjects(newWednesdayProjects)
    } else if (weekday === 4) {
      const newThursdayProjects = [...thursdayProjects]
      newThursdayProjects[index].notes = value
      setThursdayProjects(newThursdayProjects)
    } else if (weekday === 5) {
      const newFridayProjects = [...fridayProjects]
      newFridayProjects[index].notes = value
      setFridayProjects(newFridayProjects)
    } else if (weekday === 6) {
      const newSaturdayProjects = [...saturdayProjects]
      newSaturdayProjects[index].notes = value
      setSaturdayProjects(newSaturdayProjects)
    } else if (weekday === 0) {
      const newSundayProjects = [...sundayProjects]
      newSundayProjects[index].notes = value
      setSundayProjects(newSundayProjects)
    }
  }

  const projectChange = (index, weekday, value) => {
    if (weekday === 1) {
      const newMondayProjects = [...mondayProjects]
      newMondayProjects[index].projectId = Number(value)
      setMondayProjects(newMondayProjects)
    } else if (weekday === 2) {
      const newTuesdayProjects = [...tuesdayProjects]
      newTuesdayProjects[index].projectId = Number(value)
      setTuesdayProjects(newTuesdayProjects)
    } else if (weekday === 3) {
      const newWednesdayProjects = [...wednesdayProjects]
      newWednesdayProjects[index].projectId = Number(value)
      setWednesdayProjects(newWednesdayProjects)
    } else if (weekday === 4) {
      const newThursdayProjects = [...thursdayProjects]
      newThursdayProjects[index].projectId = Number(value)
      setThursdayProjects(newThursdayProjects)
    } else if (weekday === 5) {
      const newFridayProjects = [...fridayProjects]
      newFridayProjects[index].projectId = Number(value)
      setFridayProjects(newFridayProjects)
    } else if (weekday === 6) {
      const newSaturdayProjects = [...saturdayProjects]
      newSaturdayProjects[index].projectId = Number(value)
      setSaturdayProjects(newSaturdayProjects)
    } else if (weekday === 0) {
      const newSundayProjects = [...sundayProjects]
      newSundayProjects[index].projectId = Number(value)
      setSundayProjects(newSundayProjects)
    }
  }

  const saveToSharePoint = readyToSubmit => {
    let isValidate = true
    for (let i = 0; i < listItem.length; i++) {
      const newProject = [...listItem[i].name]
      for (let j = 0; j < newProject.length; j++) {
        if (newProject[j].hours === 0) {
          newProject[j].hoursBorderHightlight = true
          isValidate = false
        } else {
          newProject[j].hoursBorderHightlight = false
        }

        if (newProject[j].projectId === -1) {
          newProject[j].projectBorderHighlight = true
          isValidate = false
        } else {
          newProject[j].projectBorderHighlight = false
        }
      }
      listItem[i].addFn(newProject)
    }

    if (isValidate) {
      listItem.map(list =>
        list.name.map(listRecord =>
          props.spService.createItemInTimesheet(
            listRecord.projectId,
            listRecord.hours,
            listRecord.notes,
            listRecord.id,
            listRecord.activityDate,
            readyToSubmit
          )
        )
      )
    }
  }

  const items = []

  for (var start = 0; start < days; start++) {
    items.push(beginDate.add(start, 'day').day())
  }
  return (
    <div>
      <table>
        <tr className={styles.Title}>
          <th className={styles.DateTile}>Date</th>
          <th className={styles.HrsTitle}>Hrs</th>
          <th className={styles.NotesTitle}>Notes</th>
          <th className={styles.TotalTitle}>Total</th>
        </tr>
      </table>
      {items.map((weekday, index) => (
        <div key={weekday}>
          <div className={styles.Date} key={weekday}>
            <span>{beginDate.add(index, 'day').format('DD/MM/YYYY')}</span>
            <label
              className={styles.AddNew}
              onClick={() =>
                addNewProject(
                  weekday,
                  beginDate.add(index, 'day').format('YYYY-MM-DD')
                )
              }
            >
              <span>
                <Icon iconName="Add" title="Add New"></Icon>AddNew
              </span>
            </label>
          </div>
          {listItem.map(label => (
            <React.Fragment key={label.weekday}>
              {label.weekday === weekday && (
                <Items
                  key={label.weekday}
                  item={label.name}
                  weekday={weekday}
                  projectChange={projectChange}
                  hoursChange={hoursChange}
                  notesChange={notesChange}
                  removeProject={removeProject}
                  projects={projects}
                  accountNames={accountNames}
                  isSubmitted={isSubmitted}
                ></Items>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
      <button
        className={styles.Save}
        onClick={() => saveToSharePoint(false)}
        hidden={isSubmitted}
      >
        Save
      </button>
      <button
        className={styles.Submit}
        onClick={() => saveToSharePoint(true)}
        hidden={isSubmitted}
      >
        Submit
      </button>
    </div>
  )
}

export default TimeLogPage
