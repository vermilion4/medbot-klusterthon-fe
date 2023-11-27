const Risks = ({report}) => {
  return ( 
    <div className="text-start space-y-5">
    {
      report?.map(({title, description})=> (
        <div key={title} className='flex items-start gap-[6px]'>
          <img src={'/arrowRight.svg'} className='w-[14px] h-[14px]' alt='arrow' />
          <div>
            <h3 className='text-sm font-medium'>{title}</h3>
            <p className='text-xs'>{description}</p>
          </div>
        </div>
      ))
    }
  </div>
   );
}
 
export default Risks;