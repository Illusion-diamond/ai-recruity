import React from 'react'
import {  FormItem, FormLabel, FormControl,FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: 'text'|'email'|'password'|'file'
}

const FormField = <T extends FieldValues>({ name, control, label, placeholder, type="text" }: FormFieldProps<T>) => (
    <Controller name={name} 
        control={control} 
        render={({ field }) => (

        <FormItem>
        <FormLabel className='label'>{label}</FormLabel>
        <FormControl>
            <Input className='input' placeholder={placeholder} type={type} {...field} />
        </FormControl>
        <FormMessage />
        </FormItem>
    )}
    />
)

export default FormField