import fs, { read } from 'fs'
import { join } from 'path'


const configFile = join(process.cwd(), 'app/configs.json')

export function useSettings() {

  const getSettings = () => {
    if (!fs.existsSync(configFile)) {
      const jsonData = JSON.stringify({}, null, 2);
      fs.writeFileSync(configFile, jsonData)
      return {}
    }
    const jsonData = fs.readFileSync(configFile, 'utf8'); // Read file synchronously
    return JSON.parse(jsonData); // Parse JSON string to JavaScri
  }

  const getSettingByKey = (key: string): any | undefined => {
    const datas = getSettings()
    return datas[key] || ''
  }

  const setSettings = (value: any) => {
    const datas = getSettings()
    const newDatas = {
      ...datas,
      ...value
    }
    const jsonData = JSON.stringify(newDatas, null, 2);
    fs.writeFileSync(configFile, jsonData)
  }
  return {
    getSettings,
    getSettingByKey,
    setSettings
  }
}

