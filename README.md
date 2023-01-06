# Form Validation Library
Library will provide support for creating form object along with validation

## Install

```bash
$ npm install form-validation --save
```

## Usage

#### `useFormValidation([options])`

Create formValidation Object .

```typescript
type Category = {
    title: string;
    id: string;
    description: string;
}
const categoryFormValidation: FormValidation<Category> = useFormValidation<Category>({
        validations: {
            title: {
                required: {
                    value: true,
                    message: 'Title is required.'
                }
            }
        },
        initialValues: {
            id: '1',
            title: 'default title',
        },
        onSubmit: () => {
            console.log(`Form Data > ${JSON.stringify(categoryFormValidation.data)}`  )
            console.log(`Form Error > ${JSON.stringify(categoryFormValidation.errors)}`  )
        }
    });
 return(
     <>
    <Box id="bankForm" component="form" noValidate onSubmit={categoryFormValidation.submit}>
        <FormControl error={categoryFormValidation.errors.title? true: false} fullWidth variant="outlined" margin='normal'>
                <TextField
                    required
                    id="title"
                    error={categoryFormValidation.errors.title? true: false}
                    helperText={categoryFormValidation.errors.title}
                    value={categoryFormValidation.data.title}
                    label='Category Title'
                    variant="outlined"
                    onChange={categoryFormValidation.handleChange('title')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" margin='normal'>
                <TextField
                    minRows={3}
                    id="description"
                    value={categoryFormValidation.data.description}
                    label='Category Description'
                    variant="outlined"
                    onChange={categoryFormValidation.handleChange('description')}
                />
            </FormControl>
        </Box>
     </>
 )

```

### Available options
FormValidation Property
| Name                     | Description                                                           | Default Value |
|--------------------------|-----------------------------------------------------------------------|---------------|
| validations              | key of object T, Validation                                           |               |
| initialValues            | Partial<T>                                                            |               |
| onSubmit                 | Function called when submit event raise                               |               |

Validation Property
| Name                     | Description                                                           | Default Value |
|--------------------------|-----------------------------------------------------------------------|---------------|
| required                 | {value: boolean, message: 'error-message}                             |               |
| pattern                  | {value: Pattern, message: 'error-message}                             |               |
| custom                   | {isValid: (value: any, data: T) => boolean, message: 'error-message}  |               |

## Available Scripts
In the project directory, you can run:

### `npm build`

To build the project.\

All build file will be generated in dist folder.

### `npm test`

Launches the test runner in the interactive watch mode.\

## Technology / Third Party:
React.js, Typescript
