# excel-string-transform-json
transform excel string file to json.

### excel format:

| KEY       | ENG    | CHT  | SCH  | ... |
| --------- | ------ | ---- | ---- | --- |
| KEY1      | Test   | 測試 | 測試 | ... |
| KEY2.KEY3 | Test 2 | 測試 | 測試 | ... |

### Output JSON:

ENG.json
```json
{
  "KEY1": "Test",
  "KEY2": {
    "KEY3": "Test 2"
  }
}
```

TCH.json
```json
{
  "KEY1": "測試",
  "KEY2": {
    "KEY3": "測試"
  }
}
```
