declare module 'capsel' {
  /**
   * Memoized function with cache utilities
   */
  interface MemoizedFunction<TArgs extends unknown[], TResult> {
    (...args: TArgs): TResult
    /** Skip memoized cache and execute the function again */
    fresh(...args: TArgs): TResult
    /** Prime the cache with a specific value */
    prime(...args: TArgs): { value(val: Awaited<TResult>): void }
    /** Run the method in the background and preload the cache */
    preload(...args: TArgs): void
    /** Bust the cache for the provided args */
    bust(...args: TArgs): void
    /** Bust the cache for all args */
    bustAll(): void
  }

  /**
   * Constructor type for injectable classes
   */
  type Constructor<T = unknown> = new (...args: unknown[]) => T

  /**
   * Base class for kernel-managed classes
   */
  abstract class KernelClass {
    /** Inject a dependency */
    protected inject<T>(service: Constructor<T>): T
  }

  /**
   * Base class for Actions
   */
  abstract class ActionClass extends KernelClass {
    /** Handle the action */
    abstract handle(...args: unknown[]): unknown

    /** Invoke the action using the global kernel */
    static invoke<T extends ActionClass>(
      this: new () => T,
      ...args: T extends { handle(...args: infer A): unknown } ? A : never
    ): T extends { handle(...args: unknown[]): infer R } ? R : never

    /** Invoke the action using a specific kernel */
    static withKernel<T extends ActionClass>(
      this: new () => T,
      kernel: Kernel,
    ): {
      invoke(
        ...args: T extends { handle(...args: infer A): unknown } ? A : never
      ): T extends { handle(...args: unknown[]): infer R } ? R : never
    }
  }

  /**
   * Base class for Services
   */
  abstract class ServiceClass extends KernelClass {}

  /**
   * Base class for Repos with memoization support
   */
  abstract class RepoClass extends KernelClass {
    /** Create a memoized function (cached per request) */
    protected memo<TArgs extends unknown[], TResult>(
      fn: (...args: TArgs) => TResult,
    ): MemoizedFunction<TArgs, TResult>
  }

  /**
   * Base class for Facades (cross-module dependencies)
   */
  abstract class FacadeClass extends KernelClass {}

  /**
   * Module definition with layer classes
   */
  interface Module {
    /** Base class for Actions in this module */
    Action: typeof ActionClass
    /** Base class for Services in this module */
    Service: typeof ServiceClass
    /** Base class for Repos in this module */
    Repo: typeof RepoClass
    /** Base class for Facades in this module */
    Facade: typeof FacadeClass
  }

  /**
   * Create a new module with the given name
   */
  export function createModule(name: string): Module

  /**
   * Static invoke interface for Action classes
   */
  interface InvokableAction<TArgs extends unknown[], TResult> {
    new (): { handle(...args: TArgs): TResult }
    invoke(...args: TArgs): TResult
    withKernel(kernel: Kernel): { invoke(...args: TArgs): TResult }
  }

  /**
   * The kernel manages dependency injection and request scoping
   */
  export class Kernel {
    constructor()

    /** Set this kernel as the global instance */
    setGlobal(): void

    /** Run a function within a scoped context */
    runWithScope<T>(fn: () => T): T

    /** Bind a class to a mock implementation */
    bind<T>(original: Constructor<T>, mock: Constructor<T>): void
  }
}
