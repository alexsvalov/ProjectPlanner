using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Марка стали
/// </summary>
public partial class MarkSteelDict
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Наименование
    /// </summary>
    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<Material> Materials { get; set; } = new List<Material>();
}
