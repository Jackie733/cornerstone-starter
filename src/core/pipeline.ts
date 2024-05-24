import { partitionByType } from '@/utils';

export type Awaitable<T> = Promise<T> | T;

/**
 * Represents a pipeline error.
 *
 * The inputDataStackTrace property provides the inputs that caused the error.
 * It is ordered by nested level, starting with the inner most execution context
 * input.
 *
 * The cause property refers to the original thrown object that resulted in the
 * error.
 */
export interface PipelineError<DataType> {
  message: string;
  inputDataStackTrace: DataType[];
  cause: unknown;
}

export interface PipelineResultSuccess<ResultType> {
  ok: true;
  data: ResultType[];
}

export interface PipelineResultError<DataType> {
  ok: false;
  errors: PipelineError<DataType>[];
}

/**
 * Represents a pipeline's execution result.
 *
 * The data property holds any return values from handlers.
 *
 * The errors property holds any errors reported from (potentially nested)
 * executions.
 */
export type PipelineResult<DataType, ResultType> =
  | PipelineResultSuccess<ResultType>
  | PipelineResultError<DataType>;

export const partitionResults = <T, U>(arr: Array<PipelineResult<T, U>>) =>
  partitionByType(
    (r: PipelineResult<T, U>): r is PipelineResultSuccess<U> => r.ok,
    arr
  );

function createPipelineError<DataType>(
  message: string,
  input: DataType,
  cause: unknown
) {
  return {
    message,
    inputDataStackTrace: [input],
    cause,
  };
}

export interface IPipeline<DataType, ResultType> {
  /**
   * Runs a given input through a middleware pipeline.
   * @param input
   */
  execute(input: DataType): Promise<PipelineResult<DataType, ResultType>>;
}

const DoneSentinel: symbol = Symbol('DoneSentinel');
type DoneSentinelType = symbol;
export type Done<Out> = (out?: Out) => DoneSentinelType;

export interface PipelineContext<DataType, ResultType, ExtraContext> {
  /**
   * Terminate the pipeline with an optional pipeline return value.
   * @param pipelineReturn
   */
  done: Done<ResultType>;
  /**
   * Execute the pipeline with the given input.
   * @param input
   */
  execute(
    input: DataType,
    extra?: ExtraContext
  ): Promise<PipelineResult<DataType, ResultType>>;
  /**
   * Any extra user-supplied data.
   */
  extra?: ExtraContext;
}

/**
 * Represents an element/step of a pipeline.
 *
 * Handlers have three pipeline operations availble to them:
 * - process input and produce output for the rest of the pipeline
 * - terminate the pipeline and optionally produce a result
 * - start a nested execution of the pipeline with new data
 *
 * Handlers receive input data via the `input` parameter and pass data down the
 * pipeline by returning. Pipeline execution will await asynchronous handlers if
 * they return a Promise that resolves to the output data.
 *
 * The second argument to a handler is a context object containing an
 * `execute()` method and a `done()` method.
 *
 * A handler is free to start new pipeline executions by calling
 * `execute(input)`.  The handler does not need to await the `execute` call, as
 * the top-level pipeline will track all nested executions.
 *
 * If a handler wishes to terminate the pipeline, it must call `done()`. This
 * will signal the pipeline to terminate after the handler returns.  An optional
 * pipeline result value can be passed as the single argument to `done(output)`.
 * If `done()` is signalled, then the handler's return value is ignored.
 *
 * To facilitate typing and to avoid accidentally forgetting to return a value
 * in a handler, handlers are typed to return either the DataType or the return
 * value of done().
 */
export type Handler<
  DataType,
  ResultType = undefined,
  ExtraContext = undefined
> = (
  input: DataType,
  context: PipelineContext<DataType, ResultType, ExtraContext>
) => Awaitable<DataType | DoneSentinelType>;

/**
 * Represents an executable pipeline.
 *
 * Features supported:
 * - Execution of a pipeline in the given order of the provided handlers.
 * - Handlers can run nested executions of the same pipeline.
 * - Early termination.
 * - Reporting errors. This includes un-nesting errors from nested executions.
 * - Reporting data returned from terminating handlers, if any.
 */
export default class Pipeline {}
