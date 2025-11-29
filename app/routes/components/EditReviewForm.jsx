import { Form , FormLayout,TextField,} from '@shopify/polaris'
import React from 'react'

function EditReviewForm({ formData, HandleFormChanges }) {
    return (
        <>
            <Form>
                <FormLayout>
                    <TextField
                        label="Review"
                        placeholder="Enter Review"
                        onChange={(value) => HandleFormChanges(value, "review")}
                        value={formData.review}
                        name="review"
                    />
                    <TextField
                        label="Title"
                        placeholder="Enter Title"
                        value={formData.title}
                        onChange={(value) => { HandleFormChanges(value, "title") }}
                        name="title"
                    />
                    <TextField
                        label="Tag"
                        placeholder="Enter Tag"
                        value={formData.tag}
                        onChange={(value) => HandleFormChanges(value, "tag")}
                        name="tag"
                    />
                    <TextField
                        label="Rating"
                        placeholder="Enter Rating"
                        value={formData.rating}
                        onChange={(value) => HandleFormChanges(value, "rating")}
                        name="rating"
                    />
                    <TextField
                        label="Item Name"
                        placeholder="Enter Item Name"
                        value={formData.itemName}
                        onChange={(value) => HandleFormChanges(value, "itemName")}
                        name="itemName"
                    />
                </FormLayout>
            </Form></>
    )
}

export default EditReviewForm