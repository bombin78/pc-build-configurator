'use client'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SaveBuildBtn({disabled}: {disabled: boolean}) {
	const {pending} = useFormStatus();

	return (
		<Button
			type="submit"
			className="h-10 px-5 text-base"
			disabled={disabled || pending }
		>
			{ pending ? 'Сохранение..' : 'Сохранить'}
		</Button>
	);
};
