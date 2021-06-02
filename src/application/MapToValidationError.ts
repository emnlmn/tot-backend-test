import { Errors } from "io-ts";
import { ValidationError } from "./ValidatePayload";
import { PathReporter } from "io-ts/lib/PathReporter"
import { E } from "@app/common";

export function MapToValidationError(e: Errors): ValidationError {
    return {
        _tag: 'ValidationError',
        error: PathReporter.report(E.left(e)).toLocaleString()
    }
}
